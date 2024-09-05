import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: { user: string, text: string, timestamp: Date }[] = [];
  messageInput: string = '';
  currentUser: string = 'User1';  // You can replace this with the actual logged-in user

  constructor() { }

  ngOnInit(): void {
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
