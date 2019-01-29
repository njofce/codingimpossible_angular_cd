import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @ViewChild('draggableDiv')
  draggableDiv: ElementRef;

  @Input()
  offsetXObs: Observable<number>;

  constructor() {
  }

  ngOnInit() {
    this.offsetXObs.subscribe(val => {
      this.update(val);
    })
  }

  update(offsetX: number){
    this.draggableDiv.nativeElement.style.left = `${offsetX + 'px'}`;
  }

  ngAfterViewChecked() {
    console.log("Change detection - CONTAINER!");
  }

}