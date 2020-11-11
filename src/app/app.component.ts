import { AfterViewInit, Component, OnInit, Renderer2, Testability } from '@angular/core';
import { Observable } from 'rxjs';
// import * as BpmnJS from '../assets/bpmn-resources/bpmn';
// declare const BpmnJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'test-app';

  constructor( public renderer: Renderer2,){} 

  ngOnInit(){
  }

 ngAfterViewInit() {
    this.addCssToElement('assets/bpmn-resources/styles/app.css');
    this.addCssToElement('assets/bpmn-resources/styles/bpmnio.css');
    this.addCssToElement('assets/bpmn-resources/styles/diff.css');
    new Observable(res => {
     this.addJsToElement('assets/bpmn-resources/bpmn-viewer.js').onload = (test) => {
      console.log('bpmn-viewer.js', test)
       return res.next();
       };
    }).subscribe(data => {

     
      this.addJsToElement('assets/bpmn-resources/app.js').onload = function() {
        console.log('app.js', this);
        // const appJS: any = this;
        // console.log('app.js', appJS);
      };
    })
  }

  addCssToElement(src: string){
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = src;
    headID.appendChild(link);
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
