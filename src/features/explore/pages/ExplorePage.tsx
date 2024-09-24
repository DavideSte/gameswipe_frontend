import { useEffect, useMemo, useState } from "react";
import SwipeCard from "../components/SwipeCard";
import { SlidersHorizontal } from "lucide-react";
import Modal from "@/core/components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useLazyGetGamesQuery } from "@/core/store/api/gamesApi";
import { BounceLoader } from "react-spinners";
import Alert from "@/core/components/Alert";
import { FiltersFormData } from "../types";
import { Game, GetGamesArgs } from "@/core/store/api/gamesApi/types";
import FormFilters from "../components/FormFilters";
import useIsDesktop from "@/core/hooks/use-is-desktop";

const initialFilters: GetGamesArgs = {
  page: 1,
  console: [],
  company: [],
  genres: [],
  years: [2000, 2024],
};

export default function ExplorePage() {
  const [runGetGames, { isLoading, isError, isUninitialized, isFetching }] = useLazyGetGamesQuery();
  const [cards, setCards] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const isDesktop = useIsDesktop();

  // every time the filters change, fetch the new games
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const newGames = await runGetGames({ ...filters }).unwrap();
        setCards((prev) => (filters.page === 1 ? [...newGames] : [...prev, ...newGames]));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // when the cards array has 5 elements, fetch next cards' slot
  useEffect(() => {
    if (cards.length === 5) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [cards]);

  const onFiltersChange = (filters: FiltersFormData) => {
    setFilters({ ...filters, page: 1 });
  };

  const handleRemoveCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showLoading = useMemo(() => {
    return (
      isUninitialized || ((isFetching || isLoading) && (cards.length === 0 || filters.page === 1))
    );
  }, [cards.length, filters.page, isFetching, isLoading, isUninitialized]);

  const formFilters = useMemo(
    () => (
      <FormFilters onClose={closeModal} onChange={onFiltersChange} defaultValues={{ ...filters }} />
    ),
    [filters]
  );

  if (isError) {
    return (
      <Alert variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong.</Alert.Description>
      </Alert>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-[calc(100dvh-48px)] md:h-[calc(100dvh-64px)] overflow-hidden">
        {isDesktop && (
          <div className="w-[250px] flex-shrink-0 xl:w-[300px] block relative bg-white  m-10 rounded-xl">
            {formFilters}
          </div>
        )}
        <div className="flex justify-between items-center px-4 pt-4 pb-4 md:hidden">
          <h4>Explore</h4>
          <SlidersHorizontal
            onClick={() => setIsOpen(true)}
            strokeWidth={3}
            className="bg-white/10 rounded-full p-2 h-8 w-8 cursor-pointer "
          />
        </div>
        {showLoading ? (
          <div className="flex justify-center items-center w-full h-[100dvh]">
            <BounceLoader color="#ffffff" speedMultiplier={1.5} />
          </div>
        ) : (
          <div className="px-3 pb-3 flex-1 grid place-items-center  relative z-10">
            {[...cards].reverse().map((game) => (
              <SwipeCard
                key={game.id}
                game={game}
                removeCard={() => handleRemoveCard(game.id)}
                isFront={game.id === cards[0].id}
              />
            ))}
            {cards.length === 0 && (
              <div className="absolute h-full flex items-center">
                <p className="text-white">No more results, try extending your filters</p>
              </div>
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <Modal onClose={closeModal}>
            <motion.div
              initial={{ y: "87dvh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: "87dvh" }}
              className="absolute md:hidden bottom-0 left-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl min-h-[90dvh] pt-4"
            >
              {formFilters}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
