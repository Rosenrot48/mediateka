// import { Component, OnInit } from '@angular/core';
//
// interface IModel {
//   iconName: string | null;
//   title: string | null;
//   routerLink: string | null;
// }
//
// @Component({
//   selector: 'app-useful-navbar',
//   templateUrl: './useful-navbar.component.html',
//   styleUrls: ['./useful-navbar.component.css']
// })
// export class UsefulNavbarComponent implements OnInit {
//
//
//   hints: any[] = [];
//   inProduction?: boolean;
//   isNavbarCollapsed = true;
//   swaggerEnabled?: boolean;
//   version: string;
//   currentModel: IModel = {
//     iconName: null,
//     title: null,
//     routerLink: null,
//   };
//   applications: IModel[] = [
//     {
//       iconName: 'person',
//       title: '<p style="margin: 0; height: 20px;">Профиль</p>',
//       routerLink: 'profile',
//     },
//     {
//       iconName: 'security',
//       title: '<p style="margin: 0; height: 20px;">Расследования</p>',
//       routerLink: 'investigation',
//     },
//     {
//       iconName: 'grading',
//       title: '<p style="margin: 0; height: 20px;">КУП</p>',
//       routerLink: 'cup',
//     },
//     {
//       iconName: 'fingerprint',
//       title: '<p style="margin: 0; height: 20px;">КТЭ</p>',
//       routerLink: 'kte',
//     },
//     {
//       iconName: 'flash_on',
//       title: '<p style="margin: 0; height: 20px;">Оперативные</p><p style="margin: 0; height: 20px;">дежурные</p>',
//       routerLink: 'operations',
//     },
//     {
//       iconName: 'person_search',
//       title: '<p style="margin: 0; height: 20px;">Проверка</p><p style="margin: 0; height: 20px;">кандидатов</p>',
//       routerLink: 'check_candidate',
//     },
//     {
//       iconName: 'local_shipping',
//       title: '<p style="margin: 0; height: 20px;">Безопасность</p><p style="margin: 0; height: 20px;">транспорта</p>',
//       routerLink: 'transport-security',
//     },
//     {
//       iconName: 'local_fire_department',
//       title: '<p style="margin: 0; height: 20px;">Пожарная</p><p style="margin: 0; height: 20px;">безопасность</p>',
//       routerLink: 'fire-security',
//     },
//     {
//       iconName: 'policy',
//       title: '<p style="margin: 0; height: 20px;">Проверка</p><p style="margin: 0; height: 20px;">контрагентов</p>',
//       routerLink: 'policy',
//     },
//     {
//       iconName: 'psychology',
//       title: '<p style="margin: 0; height: 20px;">СПФИ</p>',
//       routerLink: 'spfi',
//     },
//     {
//       iconName: 'analytics',
//       title: '<p style="margin: 0; height: 20px;">Запросы</p><p style="margin: 0; height: 20px;">в ДИАД</p>',
//       routerLink: 'request-to-diad',
//     },
//     {
//       iconName: 'admin_panel_settings',
//       title: '<p style="margin: 0; height: 20px;">Администри</p><p style="margin: 0; height: 20px;">рование</p>',
//       routerLink: 'admin',
//     },
//     {
//       iconName: 'exit_to_app',
//       title: '<p style="margin: 0; height: 20px;">Выйти</p>',
//       routerLink: null,
//     },
//   ];
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
//   getValueByElementCode(elementCode: string): string {
//     if (this.hints.length) {
//       const result = this.hints.find(value => value.elementCode === elementCode);
//       if (result) {
//         return result.value;
//       } else {
//         return '';
//       }
//     }
//     return '';
//   }
//
//   collapseNavbar(): void {
//     this.isNavbarCollapsed = true;
//   }
//
//   isAuthenticated(): boolean {
//     return this.accountService.isAuthenticated();
//   }
//
//   login(): void {
//     this.loginModalService.open();
//   }
//
//   logout(): void {
//     this.loginService.logout();
//     this.router.navigate(['']);
//   }
//
//   toggleNavbar(): void {
//     this.isNavbarCollapsed = !this.isNavbarCollapsed;
//   }
//
//   getImageUrl(): string {
//     return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
//   }
//
// }
