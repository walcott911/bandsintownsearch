import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Artist} from '../../models/Artist.model';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    showLoading: boolean = false;
    showArtistProfile: boolean = false;
    error: boolean = false;
    width = 400;
    height = 130;
    speed = 1;
    preserveAspectRatio = 'xMidYMid meet';
    primaryColor = '#6A6A6A';
    secondaryColor = '#ecebeb';

    public artist: Artist;

    constructor(private _ApiService: ApiService) {

    }

    ngOnInit() {
        this._ApiService.searchKeyword.subscribe(keyword => {
            if (keyword === '') {
                this.showLoading = false;
            } else {
                this.showLoading = true;
                this.showArtistProfile = false;
                this.error = false;
                this._ApiService.GetArtistInfo(keyword).then(resp => {
                    this.artist = resp;
                    this.showLoading = false;
                    this.showArtistProfile = true;
                }, error => {
                    this.showLoading = false;
                    this.error = true;
                });
            }
        });
    }
}
