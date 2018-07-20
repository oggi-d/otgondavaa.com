import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule,
  MatDividerModule,
  MatTooltipModule,
  MatChipsModule,
  MatCheckboxModule,
  MatTableModule,
  MatBadgeModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTableModule,
    MatBadgeModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTableModule,
    MatBadgeModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
