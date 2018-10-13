import { NgModule, CUSTOM_ELEMENTS_SCHEMA , APP_INITIALIZER } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { Constants } from './services/constants';
import { EventNotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';
import { DisplayNotificationService } from './services/display.notification';
import { ApplicationEventService } from './services/application.event.service';
import { PushNotificationsModule, PushNotificationsService } from 'ng-push';
import { WindowRef } from './services/window.ref';
import { Http , HttpModule , ConnectionBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    RoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    PushNotificationsModule,
    NgxDatatableModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    UserService,
    ApplicationEventService,
    Constants,
    EventNotificationService,
    WebSocketService,
    DisplayNotificationService,
    PushNotificationsService,
    NotificationsService,
    WindowRef
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
