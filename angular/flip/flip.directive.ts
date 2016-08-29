import { 
  Directive, 
  Input,
  OnInit,
  OnChanges,
  ContentChild,
  SimpleChanges,
  ElementRef,
  Renderer,
  ChangeDetectorRef,
  NgZone
} from '@angular/core'

@Directive({
  selector: '[flip]'
})
export class FlipDirective implements OnInit, OnChanges {
  @Input('flip') target: any[]
  @Input('move-class') moveClass: string = 'moving'

  private moveCb: (event?: TransitionEvent) => void | null = null
  private pos: { left: number, top: number } | null = null

  constructor (
    private el: ElementRef, 
    private renderer: Renderer,
    private zone: NgZone
  ) {}

  ngOnInit (): void {
    this.pos = this.el.nativeElement.getBoundingClientRect()
  } 

  ngOnChanges (changes: SimpleChanges): void {
    if (!this.pos) return

    if (this.moveCb) {
      this.moveCb()
    }

    const native = this.el.nativeElement

    const prev = this.pos
    const next = this.pos = native.getBoundingClientRect()

    const dx = prev.left - next.left
    const dy = prev.top - next.top

    if (!dx && !dy) return

    const s = native.style
    s.transitionDuration = '0s'
    s.transform = `translate(${dx}px, ${dy}px)`

    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        native.classList.add(this.moveClass)
        s.transitionDuration = s.transform = ''

        native.addEventListener('transitionend', this.moveCb = (event?: TransitionEvent) => {
          if (!event || /transform$/i.test(event.propertyName)) {
            native.removeEventListener('transitionend', this.moveCb)
            native.classList.remove(this.moveClass)
            this.moveCb = null
          }
        })
      })
    })
  }
}