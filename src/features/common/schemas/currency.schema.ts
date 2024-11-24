import { z } from "zod";

import { Currency } from "../constants/common.constants";

export const currencySchema = z.nativeEnum(Currency);
