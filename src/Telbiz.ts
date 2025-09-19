import axios, { AxiosResponse } from "axios";
import https from "https";

const UrlEndpoint = "https://api.telbiz.la";
const TokenUrl = "/api/v1/connect/token";
const SMSUrl = "/api/v1/smsservice/newtransaction";
const TopupUrl = "/api/v1/topupservice/newtransaction";

const GrantType = "client_credentials";
const Scope = "Telbiz_API_SCOPE profile openid";

export class Telbiz {
  private ClientID: string;
  private Secret: string;

  public SMSHeader = {
    Default: "Telbiz",
    News: "News",
    Promotion: "Promotion",
    OTP: "OTP",
    Info: "Info",
    Unknown: "Unknown",
  } as const;

  constructor(ClientID: string, Secret: string) {
    this.ClientID = ClientID;
    this.Secret = Secret;
  }

  // Get access token
  async GetAccessToken(): Promise<string> {
    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios({
        url: UrlEndpoint + TokenUrl,
        method: "POST",
        data: {
          ClientID: this.ClientID,
          GrantType: GrantType,
          Scope: Scope,
          Secret: this.Secret,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.accessToken;
    } catch (err: any) {
      throw err.response ?? err;
    }
  }

  // Send SMS
  async SendSMSAsync(header: string, phone: string, message: string): Promise<any> {
    const token = await this.GetAccessToken();

    if (isNaN(Number(phone))) {
      throw {
        statusText: "INVALID_PHONE_NUMBER",
        message: "Phone number must be number only.",
      };
    }

    if (!phone.startsWith("20") && !phone.startsWith("30")) {
      throw {
        statusText: "INVALID_PHONE_NUMBER",
        message: "Start with 20xxxxxxxx or 30xxxxxxx",
      };
    }

    if (phone.length > 10) {
      throw {
        statusText: "INVALID_LENGTH_PHONE_NUMBER",
      };
    }

    try {
      const response: AxiosResponse<any> = await axios({
        url: UrlEndpoint + SMSUrl,
        method: "POST",
        data: {
          Title: header,
          Message: message,
          Phone: phone,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 419) {
        throw { status: 401, statusText: "Unauthorized" };
      }
      throw err.response?.data ?? err;
    }
  }

  // Send Topup
  async SendTopupAsync(phone: string, amount: number): Promise<any> {
    const token = await this.GetAccessToken();

    if (isNaN(Number(phone))) {
      throw {
        statusText: "INVALID_PHONE_NUMBER",
        message: "Phone number must be number only.",
      };
    }

    if (!phone.startsWith("20") && !phone.startsWith("30")) {
      throw {
        statusText: "INVALID_PHONE_NUMBER",
        message: "Start with 20xxxxxxxx or 30xxxxxxx",
      };
    }

    if (phone.length > 10) {
      throw {
        statusText: "INVALID_LENGTH_PHONE_NUMBER",
      };
    }

    if (amount < 5000) {
      throw {
        statusText: "INVALID_AMOUNT",
        message: "Amount must be at least 5000",
      };
    }

    try {
      const response: AxiosResponse<any> = await axios({
        url: UrlEndpoint + TopupUrl,
        method: "POST",
        data: {
          Amount: amount,
          Phone: phone,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 419) {
        throw { status: 401, statusText: "Unauthorized" };
      }
      throw err.response?.data ?? err;
    }
  }
}
