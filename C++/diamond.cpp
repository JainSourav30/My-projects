#include <bits/stdc++.h>
using namespace std;

void EditDistDP(string s1, string s2)
{
    int len1 = s1.length();
    int len2 = s2.length();
    vector<vector<int>> dp(len1 + 1, vector<int>(len2 + 1));
    int ins = 1;
    int del = 1;
    int rep = 2;
    int t;
    for (int i = 0; i <= len1; i++)
    {
        dp[0][i] = i;
        dp[i][0] = i;
    }
    for (int i = 1; i <= len1; i++)
    {
        for (int j = 1; j <= len2; j++)
        {
            if (s1[i-1] == s2[j-1])
                t = dp[i - 1][j - 1];
            else
                t = dp[i - 1][j - 1] + rep;
            dp[i][j] = min(dp[i - 1][j] + 1, min(dp[i][j - 1] + 1, t));
        }
    }
    cout << "\t\t";
    for (auto i : s1)
    {
        cout << i << "\t";
    }
    cout << "\n";
    s2 = " " + s2;
    int k = 0;
    for (auto i : dp)
    {
        cout << s2[k++] << "\t";
        for (auto it : i)
        {
            cout << it << "\t";
        }
        cout << "\n";
    }
}

// Driver program
int main()
{
    string str1 = "delete";
    string str2 = "insErt";
    EditDistDP(str1, str2);
    return 0;
}