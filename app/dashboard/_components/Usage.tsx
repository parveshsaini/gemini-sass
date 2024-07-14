import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { _History } from "../history/page";
import { UsageContext } from "@/providers/UsageProvider";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserSubscriptionContext } from "@/providers/UserSubscription";
import Link from "next/link";

const Usage = () => {
  const { totalUsage, setTotalUsage } = useContext(UsageContext);
  const { setUserSubscription } = useContext(UserSubscriptionContext);

  const { data: user} = useSession();

  const [totalCredits, setTotalCredits] = useState<number>(10000);

  useEffect(() => {
    if (user) {
      GetData();
      isUserSubscribed();
    }
  }, [user]);

  const getWords = (usageData: _History[]) => {
    let totalWords = 0;
    usageData.forEach((history) => {
      totalWords += history.aiResponse.split(" ").length;
    });
    setTotalUsage(totalWords);
  };

  const GetData = async () => {
    const response = await axios.get("/api/output");
    const usageData = response.data;
    getWords(usageData);
  };

  const isUserSubscribed = async () => {
    const response = await axios.get("/api/subscription");
    const subbed = response.data;
    if (subbed) {
      setUserSubscription(subbed);
      setTotalCredits(50000);
    }
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits 💸</h2>
        <div className="h-2 bg-[#f8bc5a] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${Math.min(100, (totalUsage / totalCredits) * 100)}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{totalCredits} credits used
        </h2>
      </div>
      <Link href={'/dashboard/billing'}>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
        
      </Button>
      </Link>
    </div>
  );
};

export default Usage;
