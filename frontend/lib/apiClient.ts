import axios from "axios";
import { Order, OrderItem, Product } from "./data";
import { User, useUser } from "@/context/user-context";



class ApiClient {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:4000";
  }



  async sendOrder(userCode: string, items: OrderItem[], receiveDate: string, returnDate: string, reason: string) {
    try {
      await axios.post(`${this.baseUrl}/order`, {
        userID: userCode,
        items,
        receiveDate,
        returnDate,
        reason
      })
    } catch (error: any) {
      console.error(error);
      throw new Error('Order creation failed due to ' + error.message);
    }
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/order/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to fetch orders due to ' + error.message);
    }
  }


  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/item/categories`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to fetch categories due to ' + error.message);
    }
  }


  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/item`);
      const data = response.data;

      // Map _id to id so React component works properly
      const products: Product[] = data.map((product: any) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        stock: product.stock,
        image: product.image,
      }));

      return products;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to fetch products due to ' + error.message);
    }
  }


  async getProductById(productId: string): Promise<Product> {
    try {
      const response = await axios.get(`${this.baseUrl}/item/${productId}`);

      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to fetch product due to ' + error.message);
    }
  }


  async login(userCode: string, password: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, {
        userCode,
        password
      });
      console.log(response.data);
      return response.data.token;
    } catch (error: any) {
      console.error(error);
      throw new Error('Login failed due to ' + error.message);
    }
  }

  async checkToken(token: string): Promise<User | undefined> {
    try {
      const UserData = await axios.get(`${this.baseUrl}/auth/me?token=${token}`);

      if (UserData) {
        const response: User = {
          userCode: UserData.data.userCode,
          tel: UserData.data.tel,
          email: UserData.data.email,
          name: UserData.data.name
        }

        return response;
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new ApiClient();
