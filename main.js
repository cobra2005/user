var userServer = 'https://randomuser.me/api/';
var tenUsers = 'https://randomuser.me/api/?results=10.';
var tbodyElement = document.querySelector('tbody');
var navBar = document.getElementById('nav');
var navElements = '';
var page = 1;
function start() {
    getUsers();
    addPage();
    movePage();
};

start();

function getUsers() {
    fetch(tenUsers)
        .then(function(response) {
            return response.json();
        })
        .then(data => {
            var users = data.results;
            var htmls = users.map(user => {
                return `
                    <tr>
                        <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
                        <td>@${user.login.username}</td>
                        <td><img src="${user.picture.thumbnail}" style="border-radius: 50%"></td>
                    </tr>
                `
            });
            tbodyElement.innerHTML = htmls.join('');
            navElements += `
                <div id="page-${page}" class="active" onclick="active(${page})">${page}</div>
            `
            navBar.innerHTML = navElements;
        })
}

function addPage() {
    var moreBtn = document.querySelector('#more');
    moreBtn.onclick = function() {
        page++;
        navElements += `
            <div id="page-${page}" class="" onclick="active(${page})">${page}</div>
        `
        navBar.innerHTML = navElements;
        fetchUsers();
    }
}

function fetchUsers() {
    fetch(tenUsers)
        .then(response => response.json())
        .then(data => {
            var users = data.results;
            var htmls = users.map(user => `
                <tr>
                    <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
                    <td>@${user.login.username}</td>
                    <td><img src="${user.picture.thumbnail}" style="border-radius: 50%"></td>
                </tr>                   
            `).join('');
            tbodyElement.innerHTML = htmls;
        })
}

function active(id) {
    var isActive = document.querySelector('#page-' + id);
    var divsInNav = document.querySelectorAll('div[onclick*="active"]');
    Array.from(divsInNav).forEach(function(divInNav) {
        divInNav.classList.remove('active');
    });
    isActive.classList.add('active');
    fetchUsers();
}

function movePage() {
    var left = document.querySelector('.arrow-left');
    var right = document.querySelector('.arrow-right');
    left.onclick = function() {
        var newPage = Number(document.querySelector('.active').innerHTML) - 1;
        if(newPage > 0) {
            active(newPage);
        } else {
            var divsInNav = document.querySelectorAll('div[onclick*="active"]');
            active(divsInNav.length);
        }
    }
    right.onclick = function() {
        var newPage = Number(document.querySelector('.active').innerHTML) + 1;
        var divsInNav = document.querySelectorAll('div[onclick*="active"]');
        if(newPage <= divsInNav.length) {
            active(newPage);
        } else {
            active(1);
        }
    }
}