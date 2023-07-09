import {delay} from "../../utils/delay"

export async function stall(stallTime = 2000) {
  await delay(stallTime)
}

interface FakeApi {
}

function FakeApi(this: FakeApi) {

}

// @ts-ignore
export default new FakeApi()
