import { ClockifyService } from "./services/ClockifyService"

let clockifyService: ClockifyService = new ClockifyService();

console.log(clockifyService.getTimeEntries());
