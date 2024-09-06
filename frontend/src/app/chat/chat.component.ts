import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: { user: string, text: string, timestamp: Date }[] = [];
  messageInput: string = '';
  currentUser: string = '';  // Initialize as an empty string

  constructor(private authService: AuthService) { } // Inject AuthService

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser().username; // Set currentUser based on logged-in user
    this.loadMessages();
  }

  sendMessage(): void {
    if (this.messageInput.trim()) {
      const newMessage = {
        user: this.currentUser,
        text: this.messageInput,
        timestamp: new Date()
      };
      this.messages.push(newMessage);
      this.saveMessages();
      this.messageInput = '';
    }
  }

  saveMessages(): void {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  loadMessages(): void {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }
}
