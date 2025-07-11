import { setupWorker } from 'msw/browser';
import {userHandlers} from "./userAuth.ts";
import {postHandlers} from "./post.ts";

export const worker = setupWorker(...userHandlers, ...postHandlers);