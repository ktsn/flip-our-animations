import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FlipDirective } from '../../flip'

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    FlipDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
