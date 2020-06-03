document.onreadystatechange = function (ev) {
    if (document.readyState == "complete") {
        console.log('i am ready - ready state');
        bankStart();
    }
}

function bankStart() {
    console.log('bankStart');


    let accountsClientsArray = []

    BankDb.Clients.forEach(acc => {
        console.log('acc++' + acc.firstName);

        let c = {
            ID: acc.ID,
            firstName: acc.firstName,
            lastName: acc.lastName,
        }
        accountsClientsArray.push(c)
        console.log('accountsClientsArray--' + accountsClientsArray[0].lastName);

    });
    document.querySelector('.accounts-list').innerHTML = shukiRender(templates.Clienttemp, accountsClientsArray)



    // let accountsCustomArray = []
    // BankDb.Accounts.forEach(acc => {
    //     let myClient = BankDb.API.getCliendById(acc.ClientId)
    //     let o = {
    //         ID: acc.ID,
    //         Balance: acc.Balance,
    //         ClientId: acc.ClientId,
    //         ClientFullName: myClient.lastName + ' ' + myClient.firstName
    //     }
    //     accountsCustomArray.push(o)


    // });
    // document.querySelector('.details-panel').innerHTML = shukiRender(templates.account, accountsCustomArray)

    init()

}

/*
class Account {
    ID;     //int
    ClientId;  //client class
    Balance;    //int

    class Client {
    firstName;
    lastName;
    ID;
}
}*/

let templates = {

    Clienttemp:
        `<div class="account Client flex-col">
    <div> <label>first Name: </label> <span>[firstName]</span> </div>
    <div> <label>last Name: </label> <span>[lastName]</span> </div>
    <div > <label>ID: </label> <span class ="idC">[ID]</span> </div>
</div>`,

    account:
        `<div class="account accountTransaction  flex-col">
        <div> <label>ID: </label> <span class ="idT">[ID]</span> </div>
        <div> <label>Client Full Name: </label> <span>[ClientFullName]</span> </div>
        <div> <label>Client Id: </label> <span>[ClientId]</span> </div>
        <div> <label>Balance: </label> <span>[Balance]</span> </div>
    </div>`,


    Transaction:
        `<div class="account Transaction flex-col">
    <div> <label>AccountId: </label> <span>[AccountId]</span> </div>
    <div> <label>Type: </label> <span>[Type]</span> </div>
    <div> <label>Amount: </label> <span>[Amount]</span> </div>
    <div > <label>ID: </label> <span>[ID]</span> </div>
</div>`,
}

// Transaction 
//     ID;
//     AccountId;
//     Type;   // Deposit / Withdraw    הפקדה/משיכה
//     Amount;


function init() {
    let all = document.querySelectorAll('.account')
    console.log("chaim/ " + all);

    all.forEach(div => {
        div.onclick = function (ev) {


            document.querySelectorAll('.account').forEach(a =>
                a.className = a.className.replace("acount", ""))
            div.className += " acount"

            ClientId = this.querySelector('.idC').textContent;

            console.log('id+++' + ClientId);

            myClient = BankDb.API.getAccountByClientId(ClientId)
            console.log('getAccountByClientId//// ' + myClient);

            document.querySelector('.details-panel').innerHTML = shukiRender(templates.account, myClient)

            initTrans()
        }

    })
}

function initTrans() {
    let Trans = document.querySelectorAll('.accountTransaction')
    Trans.forEach(acc => {
        acc.onclick = function (ev) {
            console.log("initTrans" + ev);

            accId = document.querySelector('.idT').textContent;
            console.log('Transaction=== ' + accId);
            myTrans = BankDb.API.getTransactionsByAccountId(accId)
            console.log(myTrans);

            document.querySelector('.details-panel').innerHTML = shukiRender(templates.Transaction, myTrans)
        }
    })
}
