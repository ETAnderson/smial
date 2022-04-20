
import { Octokit } from '@octokit/rest';


export default async function authenticate(){
     try{
        const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN,
        }); 
        return octokit;
     }catch (error){
        console.log(error);
     }
  }
