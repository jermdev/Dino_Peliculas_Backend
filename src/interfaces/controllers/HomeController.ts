import { HomeFeedService } from '@/application/services/HomeFeedService.js'

export class HomeController {
    constructor(private homeService: HomeFeedService){}

    async getDashBoard() {
        return await this.homeService.buildDashboard()
    }
} 