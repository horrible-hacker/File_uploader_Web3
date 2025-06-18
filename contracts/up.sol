// SPDX-License-Identifier: MIT 
pragma solidity >=0.7.0 < 0.90;
//import "hardhat/console.sol";

contract Upload{
    address public owner;
    struct access{
        address user;
        bool access;
    }
    constructor()
    {
        owner = msg.sender;
    }
    mapping(address=>string[]) value;
    mapping(address=>access[]) accessList;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>mapping(address=>bool)) previousData;
    
    function add(address _user,string memory url) external{
        value[_user].push(url);
        

    }
    function getValueLength(address _user) public view returns (uint) 
    {
        return value[_user].length;
    } 
    function allow(address _user) external {
        ownership[msg.sender][_user] =  true;
        if(previousData[msg.sender][_user]==true)
        {
            for(uint i=0;i<accessList[msg.sender].length;i++)
            {
                if(accessList[msg.sender][i].user==_user)
                {
                    accessList[msg.sender][i].access = true;
                }
            }
        }
        else 
        {
            previousData[msg.sender][_user]= true;

            accessList[msg.sender].push(access(_user,true));
        }
    }
    function disallow(address _user) external {
        ownership[msg.sender][_user] =  false;
        for(uint i=0;i<accessList[msg.sender].length ;i++)
        {
            if(accessList[msg.sender][i].user==_user)
            {
                accessList[msg.sender][i].access = false;
            }
        }
    }
    function display(address _user) external  view returns (string[] memory)
    {
        require(_user==msg.sender || ownership[_user][msg.sender],"Unauthorized");
        return value[_user];
    }
    function shareAccess() public view returns (access[] memory)
    {
        return  accessList[msg.sender];
    }
}
