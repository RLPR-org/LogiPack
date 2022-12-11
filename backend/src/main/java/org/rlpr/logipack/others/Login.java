package org.rlpr.logipack.others;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Login {

    private String email;
    private String password;

    public Boolean checkLogin(String password_hash) {
        return password_hash.equals(String.valueOf(password.hashCode()));
    }

}
