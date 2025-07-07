import { setupWorker } from 'msw/browser';
import {userHandlers} from "./userAuth.ts";

export const worker = setupWorker(...userHandlers);