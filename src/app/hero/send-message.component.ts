import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HeroService } from '../service/hero.service';

@Component({

	template: `
	<div class="row">
	    <div class="col-md-4 offset-md-4">
	        <div class="panel panel-default" style="margin-top:25%;">
	            <div class="panel-body">
	                <form class="form-horizontal" novalidate (ngSubmit)="send()" [formGroup]="messageForm">

	                    <fieldset>
	                        <div class="form-group">
	                        	<label>From : {{ from.name }}</label>
	                        </div>

	                        <div class="form-group">
	                        	<label>To: </label>
	                            <select class="form-control" formControlName="to">
	                            	<option *ngFor="let hero of results" value="{{ hero.name }}">{{ hero.name }}</option>
	                            </select>
	                        </div>

	                        <div class="form-group">
	                        	<label>Message: </label>
	                        	<textarea class="form-control" formControlName="message"></textarea>
	                        </div>

	                        <!-- Change this to a button or input when using this as a form -->
	                        <div>
	                        	<input type="submit" class="btn btn-primary" value="Send">
	                        	<input type="button" class="btn btn-danger" value="Back">
	                        </div>	
	                    </fieldset>
	                </form>
	            </div>
	        </div>
	    </div>
	</div>
	`
})
export class SendMessageComponent implements OnInit{

	from: any;
	results: any;
	messageForm: FormGroup;
	token: any;

	constructor(private heroService: HeroService) { }

	ngOnInit() {

		this.token = sessionStorage.getItem('_token');
		this.from = JSON.parse(sessionStorage.getItem('_current_user'));

		this.heroService.getHeroList(this.token).subscribe((data) => {

			this.results = data;
		});

		this.messageForm = new FormGroup({

			'from': new FormControl(this.from.name, Validators.required),
			'to': new FormControl('', Validators.required),
			'message': new FormControl('', Validators.required)
		});
	}

	send() {

		console.log(this.messageForm.get('to'));

		if(!this.messageForm.invalid) {

			this.heroService.sendMessage(this.token, JSON.stringify(this.messageForm.value));	
					
		} else {

			console.log('Invalid message form');
		}
	}
}