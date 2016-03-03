
export class AlertConfig implements IAlertConfiguration{
    
    style: string;
    message: string;
    imagePath: string;
    
    public constructor(style: string, message:string, imagePath: string){
        this.style = style;
        this.message = message;
        this.imagePath= imagePath;
    }     
}