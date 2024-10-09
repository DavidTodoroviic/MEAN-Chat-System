import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>; // Reference to the video element
  messages: { user: string, text?: string, imageUrl?: string, timestamp: Date }[] = [];
  messageInput: string = '';
  currentUser: string = '';  // Initialize as an empty string
  selectedFile: File | null = null; // Add a property for the selected file
  isVideoChatActive: boolean = false; // Add property for video chat status
  isMeetingActive: boolean = false; // Add property for meeting status
  localStream: MediaStream | null = null; // Add property for local video stream
  remoteStream: MediaStream | null = null; // Add property for remote video stream
  peerConnection: RTCPeerConnection | null = null; // Add property for WebRTC peer connection

  constructor(private authService: AuthService, private http: HttpClient) { } // Inject AuthService and HttpClient

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser().username; // Set currentUser based on logged-in user
    this.loadMessages();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  sendMessage(): void {
    if (this.messageInput.trim() || this.selectedFile) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('chatImage', this.selectedFile);
        this.http.post<{ filePath: string }>('http://localhost:3000/upload/chat', formData).subscribe(response => {
          const newMessage = {
            user: this.currentUser,
            imageUrl: `http://localhost:3000/${response.filePath}`, // Ensure the URL is correct
            timestamp: new Date()
          };
          this.messages.push(newMessage);
          this.saveMessages();
          this.selectedFile = null;
        });
      } else {
        const newMessage = {
          user: this.currentUser,
          text: this.messageInput,
          timestamp: new Date()
        };
        this.messages.push(newMessage);
        this.saveMessages();
      }
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

  // Method to start a video chat
  async startVideoChat(): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localVideo.nativeElement.srcObject = this.localStream; // Attach the local stream to the video element
      this.peerConnection = new RTCPeerConnection();

      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0];
      };

      if (this.peerConnection && this.localStream) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection!.addTrack(track, this.localStream as MediaStream);
        });
      }

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer through your signaling server
      console.log('Video chat started');
      this.isVideoChatActive = true;
    } catch (error) {
      console.error('Error starting video chat:', error);
    }
  }

  // Method to stop a video chat
  stopVideoChat(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    this.isVideoChatActive = false;
  }

  // Method to start a meeting
  startMeeting(): void {
    console.log('Meeting started');
    this.isMeetingActive = true;
    // Implement meeting scheduling logic here
  }

  // Method to stop a meeting
  stopMeeting(): void {
    console.log('Meeting stopped');
    this.isMeetingActive = false;
    // Implement meeting stopping logic here
  }
}