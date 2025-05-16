import { Component, OnInit } from '@angular/core';
import { Firestore,collection, addDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit {
  properties: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const querySnap = await getDocs(collection(this.firestore, 'properties'));
    this.properties = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

