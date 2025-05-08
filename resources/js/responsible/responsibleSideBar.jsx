import {
  HomeIcon,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";
import { Users, Box, LogIn, UserPlus, Inbox, Columns, File, Calendar, LogOut } from "react-feather";
import React from "react";

export default function ResponsibleSideBar({ hundleActiveTable }) {
  return (
      <div className="h-screen fixed top-0 left-0 bg-gradient-to-b from-blue-50 to-white shadow-lg">
          <Sidebar 
              aria-label="Sidebar Navigation" 
              className="w-64 border-r border-blue-100 p-4"
          >
              <div className="mb-8 p-4">
                  <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                      {/* <TestTube size={24} /> */}
                      <span>TestFlow</span>
                  </h2>
              </div>

              <SidebarItemGroup className="space-y-2">
                  <SidebarItem 
                      className="cursor-pointer hover:bg-blue-100 rounded-lg transition-all duration-200 group"
                      onClick={() => {hundleActiveTable("testCases")}}
                  >
                      <div className="flex items-center text-blue-800 group-hover:text-blue-600">
                          {/* <TestTube className="mr-3 h-5 w-5" /> */}
                          <span className="font-medium">🧪 Test Cases</span>
                      </div>
                  </SidebarItem>

                  <SidebarItem 
                      className="cursor-pointer hover:bg-blue-100 rounded-lg transition-all duration-200 group"
                      onClick={() => {hundleActiveTable("planTest")}}
                  >
                      <div className="flex items-center text-blue-800 group-hover:text-blue-600">
                          <Calendar className="mr-3 h-5 w-5" />
                          <span className="font-medium">Plan Test</span>
                      </div>
                  </SidebarItem>

                  <div className="border-t border-blue-100 my-4"></div>

                  <SidebarItem 
                      className="cursor-pointer hover:bg-blue-100 rounded-lg transition-all duration-200 group mt-4"
                      href="/"
                  >
                      <div className="flex items-center text-blue-800 group-hover:text-blue-600">
                          <LogOut className="mr-3 h-5 w-5" />
                          <span className="font-medium">Sign out</span>
                      </div>
                  </SidebarItem>
              </SidebarItemGroup>

              <div className="absolute bottom-6 left-0 right-0 px-6">
                  <div className="text-xs text-blue-400 text-center">
                      v1.0.0 • © 2025 TestFlow
                  </div>
              </div>
          </Sidebar>
      </div>
  );
}

