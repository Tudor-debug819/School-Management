import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, getDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password).then(userCredentials => {
            if (userCredentials.user) {
                this.getUserRole(userCredentials.user.uid);
            }
        })

    }

    async getUserRole(uid: string) {
        const docRef = doc(this.firestore, `users/${uid}`);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            this.redirectUser(userData['role']);
        }


    }

    redirectUser(role: string) {
        switch (role) {
            case 'admin':
                this.router.navigate(['admin-dashboard']);
                break;
            case 'teacher':
                this.router.navigate(['teacher-dashboard']);
                break;
            case 'student':
                this.router.navigate(['student-dashboard']);
                break;

        }
    }

}