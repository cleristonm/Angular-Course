import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    //https://angular.io/guide/styleguide#hostlistenerhostbinding-decorators-versus-host-metadata

    @HostBinding('class.open') classOpen = false;

    
    constructor( private elRef: ElementRef) {}
    
    @HostListener('document:click', ['$event']) toggleOpen(event: Event){
        this.classOpen = this.elRef.nativeElement.contains(event.target) ? !this.classOpen : false;
    }


    // @HostListener('click') toggleClassOpen(){
    //     this.classOpen = (!this.classOpen); 
    // }
    
    // My approach
    // 
    // constructor( private el: ElementRef){}

    // @HostListener('click') onMouseClick(){
    //     if (this.el.nativeElement.classList.contains("open")){
    //         this.el.nativeElement.classList.remove("open");    
    //     }else{
    //         this.el.nativeElement.classList.add("open");
    //     }
        
    //     console.log(this.el.nativeElement.classList)
    // }

}