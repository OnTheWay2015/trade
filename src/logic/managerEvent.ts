import { ManagerBaseIF } from './managerBase';

    export class ManagerEvent implements  ManagerBaseIF {
        private _eventMap:any = {};
        constructor() { 
        }

        public addGlobleKeyEvent(keycode:number, cb:any ): void {
            let self = this;
            if (self._eventMap[keycode])
            {
                self._eventMap[keycode].push(cb);
            }
            else
            {
                self._eventMap[keycode] = [cb];
            }
        }

        public rmvGlobleKeyEvent(keycode:number, cb: any): void {
            let self = this;
            if (self._eventMap[keycode] )
            {
                let cbs = self._eventMap[keycode];
                for (let i=cbs.length-1;i>=0;i--)
                {
                    if (cb == cbs[i])
                    {
                        cbs.slice(i,1);
                    }
                }
            }
        }

        public init(cb?:(res:number)=>void){

        }

        public start(p:any) {
            let self = this;
            document.onkeydown = (ev: any) => {
                let keycode = ev.keyCode;
                console.log("onkey:" + keycode);
                if (self._eventMap[keycode]) {
                    let cbs = self._eventMap[keycode];
                    for (let i = 0; i < cbs.length; i++) {
                        cbs[i](ev);
                    }
                }
            };
        }
    }
