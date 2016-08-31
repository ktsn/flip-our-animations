import {
  Directive,
  Input,
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
export class FlipDirective implements OnChanges {
  @Input('flip') target: any[]
  @Input('move-class') moveClass: string = 'moving'

  private moveCb: (event?: TransitionEvent) => void | null = null
  private pos: { left: number, top: number } | null = null

  constructor (
    private el: ElementRef,
    private renderer: Renderer,
    private zone: NgZone
  ) {}

  ngOnChanges (changes: SimpleChanges): void {
    if (this.moveCb) {
      this.moveCb()
    }

    const native = this.el.nativeElement

    const prev = this.pos
    const next = this.pos = native.getBoundingClientRect()

    if (!prev) return

    const dx = prev.left - next.left
    const dy = prev.top - next.top

    if (!dx && !dy) return

    const r = this.renderer
    r.setElementStyle(native, 'transitionDuration', '0s')
    r.setElementStyle(native, 'transform', `translate(${dx}px, ${dy}px)`)

    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        r.setElementClass(native, this.moveClass, true)
        r.setElementStyle(native, 'transitionDuration', '')
        r.setElementStyle(native, 'transform', '')

        native.addEventListener('transitionend', this.moveCb = (event?: TransitionEvent) => {
          if (!event || /transform$/i.test(event.propertyName)) {
            native.removeEventListener('transitionend', this.moveCb)
            r.setElementClass(native, this.moveClass, false)
            this.moveCb = null
          }
        })
      })
    })
  }
}
