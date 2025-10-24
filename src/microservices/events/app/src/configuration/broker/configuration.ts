import {registerAs} from "@nestjs/config";
import {BrokerConfigService} from "./config.service";

const brokerConfigService: BrokerConfigService = new BrokerConfigService()

export default registerAs("broker", () => ({
  kafkaBrokers: brokerConfigService.kafkaBrokers()
}));
