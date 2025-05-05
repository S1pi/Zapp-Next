import { NextResponse } from 'next/server';
import { getApiDocs } from './swagger'; 

export async function GET() {
  const apiDocs = getApiDocs();
  console.log("Generated API docs:", JSON.stringify(apiDocs, null, 2))
  return NextResponse.json(apiDocs); 
}