import {POSITION} from "../position/position.ts";
import {PROCEED_TYPE} from "../proceedType/proceedType.ts";
import {BEGINNER} from "../beginner/beginner.ts";

export const DROPDOWN_OPTIONS = {
	BEGINNER:Object.values(BEGINNER),
	PROCEED:Object.values(PROCEED_TYPE),
	POSITION:Object.values(POSITION),
}