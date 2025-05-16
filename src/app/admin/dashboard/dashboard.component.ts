import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { CommandPromptComponent } from '../../command-prompt/command-prompt.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  // ✅ Declare properties array
  properties: any[] = [];

  // ✅ Inputs for form
  title: string = '';
  location: string = '';
  price: number = 0;
  description: string = '';

  constructor(private firestore: Firestore, private dialog: MatDialog) { }

  async ngOnInit() {
    await this.fetchProperties();
  }

  async fetchProperties() {
    const colRef = collection(this.firestore, 'properties');
    const snapshot = await getDocs(colRef);
    this.properties = snapshot.docs.map(doc => doc.data());
  }

  async addProperty() {
    const colRef = collection(this.firestore, 'properties');
    await addDoc(colRef, {
      title: this.title,
      location: this.location,
      price: this.price,
      description: this.description
    });

    // Clear form
    this.title = '';
    this.location = '';
    this.price = 0;
    this.description = '';

    // Refresh property list
    await this.fetchProperties();
  }

  displayedColumns: string[] = ['title', 'location', 'price', 'description', 'actions'];
  openCommandPrompt(property: any) {
    this.dialog.open(CommandPromptComponent, {
      data: property
    });
  }
}
