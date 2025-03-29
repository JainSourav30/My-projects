#include<bits/stdc++.h>
#include<string>
#include<cmath>

using namespace std;

#define ll long long
   

int main(){
    int t;
    cin >> t;
    while (t--) {
        ll n,k;
        cin>>n>>k;

         if (n % 2 == 0){
                cout << "YES" << endl;
        } else {
            if( n%k == 0 || (n-k)%2 == 0){
                cout<< "YES" <<endl;
            }
            else {
                cout << "NO" <<endl;
            }
        }
    }
    return 0;

}
