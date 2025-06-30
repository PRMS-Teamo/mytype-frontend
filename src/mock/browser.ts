import { setupWorker } from 'msw/browser';
import {userHandlers} from "./login.ts";

export const worker = setupWorker(...userHandlers);