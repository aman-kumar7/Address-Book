import { Component, OnInit } from "@angular/core";
import { PostService } from "app/shared";

@Component({
    selector: 'app-post',
    templateUrl: 'post.component.html'
})

export class PostComponent implements OnInit {
    post: any;
    posts: Array<any> = [];
    constructor(private postService: PostService){

    }
    ngOnInit(): void {
        this.post = {
            title: 'New Post',
            description: 'This is the post created by zen',
            likesCount: 0,
            commentCount: 0,
            imageUrl: '',
            likes: [],
            comment: [],
        }
       // this.createPost( this.post);
        this.getPost();
        
    }

    createPost(post: any){
        this.postService.createPost(post).subscribe((res: any) => {
            console.log(res)
        })
    }

    getPost(){
        this.postService.getPost().subscribe((res: any) => {
            console.log(res);
            this.posts = res;
        })
    }

    deletePost(id: number){
        this.postService.deletePost(id).subscribe((res: any) => {
            console.log(res)
        })
    }
}