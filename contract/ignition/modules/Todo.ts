import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";  

export default buildModule("TodoModule", (m) => {  
  const todoContract = m.contract("TodoApp");  
  return { todoContract };
});

