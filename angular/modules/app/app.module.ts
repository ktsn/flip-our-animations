import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { FlipDirective } from '../../flip'

import { TodoService } from '../../services/todo.service'

import 'rxjs/add/operator/map'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    FlipDirective
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
