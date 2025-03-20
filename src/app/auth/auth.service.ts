import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

    login(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then(userCredentials => {
            if (userCredentials.user) {
                this.getUserRole(userCredentials.user.uid);
            }
        })

    }

    getUserRole(uid: string) {
        this.firestore.collection('users').doc(uid).get().subscribe(userDoc => {
            if (userDoc.exists) {
                const userData: any = userDoc.data();
                this.redirectUser(userData.role);
            }
        })

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