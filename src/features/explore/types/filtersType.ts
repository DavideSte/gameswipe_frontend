import { GetGamesArgs } from "@/core/store/api/gamesApi/types";

export type FiltersFormData = Omit<GetGamesArgs, "page">;
