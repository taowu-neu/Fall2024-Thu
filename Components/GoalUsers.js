import React, { useEffect, useState } from "react";

export default function GoalUsers(){
    async function fetchData() {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/userssss"
        );
        console.log(response.status);
        off(response.ok){
            throw new Error('HTTP error happened(with status )+ ${response.status}');
        } catch (err){
            console.log("fetch users data", err);
        }
        
    }
}