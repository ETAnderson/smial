import open from 'open';

export default async function mail() {
   await open('https://mail.google.com/mail/u/0/#inbox');
}