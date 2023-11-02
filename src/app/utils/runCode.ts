import * as Echarts from "echarts";
import { AjaxService } from "../@core/charts/service/AjaxService";

export async function runCode(code: string, $: AjaxService, myChart: any) {
  let option = null;
  const echarts = Echarts;
  const china = await $.getJsonFile('china.json')
  echarts.registerMap('china', china);
  try {
    // 避免多次申明
    code = code.replace(/var option/g, 'option')
    eval(code);
  } catch (err) {
    console.error(err);
  }
  return option;
}
