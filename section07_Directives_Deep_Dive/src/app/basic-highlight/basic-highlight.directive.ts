import { Directive, ElementRef, OnInit } from "@angular/core";


@Directive({
    selector: '[appBasicHighlight]',

})
export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef: ElementRef) {
        
    }

    //https://medium.com/better-programming/angular-manipulate-properly-the-dom-with-renderer-16a756508cba
    //https://angular.io/api/core/Renderer2
    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

}