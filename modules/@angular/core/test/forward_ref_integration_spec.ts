import {
  beforeEach,
  ddescribe,
  describe,
  expect,
  iit,
  inject,
  it,
  xit
} from '@angular/core/testing/testing_internal';
import {
  bind,
  provide,
  forwardRef,
  resolveForwardRef,
  Component,
  Directive,
  Inject,
  Query,
  QueryList
} from '@angular/core';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {AsyncTestCompleter} from '@angular/core/testing/testing_internal';
import {NgFor} from '@angular/common';
import {Type} from '../src/facade/lang';
import {asNativeElements} from '@angular/core';

export function main() {
  describe("forwardRef integration", function() {
    it('should instantiate components which are declared using forwardRef',
       inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {
         tcb.createAsync(App).then((tc) => {
           tc.detectChanges();
           expect(asNativeElements(tc.debugElement.children)).toHaveText('frame(lock)');
           async.done();
         });
       }));
  });
}

@Component({
  selector: 'app',
  viewProviders: [forwardRef(() => Frame)],
  template: `<door><lock></lock></door>`,
  directives: [forwardRef(() => Door), forwardRef(() => Lock)],
})
class App {
}

@Component({
  selector: 'lock',
  directives: [NgFor],
  template: `{{frame.name}}(<span *ngFor="let  lock of locks">{{lock.name}}</span>)`,
})
class Door {
  locks: QueryList<Lock>;
  frame: Frame;

  constructor(@Query(forwardRef(() => Lock)) locks: QueryList<Lock>,
              @Inject(forwardRef(() => Frame)) frame: Frame) {
    this.frame = frame;
    this.locks = locks;
  }
}

class Frame {
  name: string;
  constructor() { this.name = 'frame'; }
}

@Directive({selector: 'lock'})
class Lock {
  name: string;
  constructor() { this.name = 'lock'; }
}
