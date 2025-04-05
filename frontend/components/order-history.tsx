"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/data";
import { useUser } from "@/context/user-context";
import apiClient from "@/lib/apiClient";

export default function OrderHistory() {
  const { userData, setUserData } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      if (userData?.userCode === "" && localStorage.getItem("user-token")) {
        const userdata = await apiClient.checkToken(localStorage.getItem("user-token") as string);
        if (userdata && userdata?.userCode !== "") {

          setUserData(userdata);
        }
      }
    }

    if (userData?.userCode === "") {
      getUserData();
    } else {
      fetchOrders();
    }
  }, [userData, setUserData]);

  const fetchOrders = async () => {
    try {
      const userOrders = await apiClient.getOrdersByUser(userData?.userCode);
      setOrders(userOrders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Order History</h2>
      </div>

      {loading ? (
        <div className="p-6 text-center">Loading orders...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">Error: {error}</div>
      ) : orders.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Order {order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive: {new Date(order.receiveDate).toLocaleDateString()} | Return:{" "}
                    {new Date(order.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleOrderExpansion(order.id)}>
                  {expandedOrders.includes(order.id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {expandedOrders.includes(order.id) && (
                <div className="mt-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium">Reason for Borrowing:</h4>
                    <p className="text-sm text-muted-foreground">{order.reason}</p>
                  </div>

                  <h4 className="mb-2 text-sm font-medium">Items</h4>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-2 text-left text-sm font-medium">Item</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.productId} className="border-b last:border-0">
                            <td className="px-4 py-3">{item.product.name}</td>
                            <td className="px-4 py-3">{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
