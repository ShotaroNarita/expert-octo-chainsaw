export namespace CONSTANTS {
    export namespace ACTION {
        export namespace CHOICE {
            export const PUT: string = 'action/choice/put';
            export const ADD: string = 'action/choice/add';
            export const GET: string = 'action/choice/get';
            export const DELETE: string = 'action/choice/delete';
        }

        export namespace MODEL {
            export const PUT: string = 'action/model/put';
            export const ADD: string = 'action/model/add';
            export const GET: string = 'action/model/get';
            export const DELETE: string = 'action/model/delete';
        }

        export namespace MODE{
            export const PUT: string = 'action/mode/put';
        }
    }

    export namespace MUTATION {
        export namespace CHOICE {
            export const UPDATE: string = 'mutation/choice/update';
        }

        export namespace MODEL {
            export const UPDATE: string = 'mutation/model/update';
        }

        export namespace MODE{
            export const UPDATE: string = 'mutation/mode/update';
        }
    }

    export namespace MODE {
        export const CHOICE_EDITOR: string = 'Choice Editor';
        export const MODEL_EDITOR: string = 'Model Editor';
        export const HELP: string = 'Help';

        export const LIST: Array<string> = [CHOICE_EDITOR, MODEL_EDITOR, HELP];
    }
}